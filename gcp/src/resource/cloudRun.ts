import { CloudRunService, CloudRunServiceConfig, CloudRunServiceTemplate } from '../../.gen/providers/google/cloud-run-service'
import { CloudRunServiceIamPolicy } from '../../.gen/providers/google/cloud-run-service-iam-policy'
import { DataGoogleIamPolicy } from '../../.gen/providers/google/data-google-iam-policy'
import { Template } from './template'

export class CloudRunResource extends Template {
    imagePath?: string
    concurrency?: number
    port?: number
    requestSpec?: {
        cpu: string
        memory: string
    }
    limitSpec?: {
        cpu: string
        memory: string
    }
    authorizedInvokers?: string[]
    inject(data: {
        imagePath: string
        concurrency: number
        port: number
        requestSpec: {
            cpu: string
            memory: string
        }
        limitSpec: {
            cpu: string
            memory: string
        }
        authorizedInvokers: string[]
    }): CloudRunResource {
        this.imagePath = data.imagePath
        this.concurrency = data.concurrency
        this.port = data.port
        this.requestSpec = data.requestSpec
        this.limitSpec = data.limitSpec
        this.authorizedInvokers = data.authorizedInvokers
        return this
    }
    gen(): CloudRunService {
        if (!this.imagePath || !this.concurrency || !this.port || !this.requestSpec || !this.limitSpec || !this.authorizedInvokers) {
            throw Error('inject() must be called before gen()')
        }
        const cloudRunServiceTemplate: CloudRunServiceTemplate = {
            spec: {
                containerConcurrency: this.concurrency,
                serviceAccountName: this.serviceAccountName,
                timeoutSeconds: 300,
                containers: [
                    {
                        image: this.imagePath!,
                        ports: [
                            {
                                name: 'http1',
                                containerPort: this.port,
                            },
                        ],
                        resources: {
                            limits: this.limitSpec,
                            requests: this.requestSpec,
                        },
                    },
                ],
            },
            metadata: {
                annotations: {
                    'autoscaling.knative.dev/maxScale': '1',
                    'run.googleapis.com/execution-environment': 'gen2',
                    'run.googleapis.com/cpu-throttling': 'true',
                },
            },
        }
        const cloudRunServiceConfig: CloudRunServiceConfig = {
            location: this.region,
            name: `${this.projectName}-${this.serviceName}-cloudrun`,
            template: cloudRunServiceTemplate,
            autogenerateRevisionName: true,
            traffic: [
                {
                    percent: 100,
                    latestRevision: true,
                },
            ],
        }
        const appCloudrun = new CloudRunService(this.scope, `${this.projectName}-${this.serviceName}-cloudrun`, cloudRunServiceConfig)
        const policyData = new DataGoogleIamPolicy(this.scope, 'appContainerAccessPolicy', {
            binding: [
                {
                    role: 'roles/run.invoker',
                    members: this.authorizedInvokers!,
                },
            ],
        })

        new CloudRunServiceIamPolicy(this.scope, 'runsvciampolicy', {
            location: this.region,
            project: appCloudrun.project,
            service: appCloudrun.name,
            policyData: policyData.policyData,
        })
        return appCloudrun
    }
}
