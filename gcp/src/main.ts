import { Construct } from 'constructs';
import { App, GcsBackend, TerraformOutput, TerraformStack } from 'cdktf';
import { GoogleProvider } from '../.gen/providers/google/provider';
import { CloudRunResource } from './resource/cloudRun';
import { ContainerRegistryResource } from './resource/containerRegistry';

const REGION = process.env.REGION as string;
const PROJECT_ID = process.env.PROJECT_ID as string;

// クライアント向けインフラ
class AppStack extends TerraformStack {
  constructor(scope: Construct, projectName: string) {
    super(scope, projectName)

    const credentials = require('../credential/serviceAccountKey.json')
    const credStr = JSON.stringify(credentials)
    
    new GoogleProvider(this, 'GoogleAuth', {
        region: REGION,
        zone: REGION + '-c',
        project: PROJECT_ID,
        credentials: credStr,
    })

    new GcsBackend(this, {
        bucket: `${PROJECT_ID}-tfstate`,
        prefix: 'terraform/state',
        credentials: credStr,
    })

    const containerRegistry = new ContainerRegistryResource(
        this,
        PROJECT_ID, 
        projectName, 
        'api', 
        REGION, 
        credentials.client_email,
    ).inject({
        location: 'asia'
    }).gen()

    new TerraformOutput(this, 'appContainerRegistry', {
        value: containerRegistry.bucketSelfLink,
    });

    const apiImagePath = `asia.gcr.io/${PROJECT_ID}/${projectName}-api`
    const apiCloudRunInstance = new CloudRunResource(
        this,
        PROJECT_ID, 
        projectName, 
        'api', 
        REGION, 
        credentials.client_email,
    ).inject({
        imagePath: apiImagePath,
        concurrency: 1,
        port: 8080,
        requestSpec: {
            cpu: '100m',
            memory: '256Mi',
        },
        limitSpec: {
            cpu: '1000m',
            memory: '512Mi',
        },
        authorizedInvokers: ['allUsers']
    }
    ).gen();

    new TerraformOutput(this, 'appApiCloudRunInstanceURL', {
        value: apiCloudRunInstance.status.get(0).url,
    });
  }
}

const app = new App();

new AppStack(app, 'simple-chatroom-app');

app.synth();
