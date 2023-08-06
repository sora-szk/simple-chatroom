import { Construct } from 'constructs'

export abstract class Template {
    readonly scope: Construct
    readonly projectID: string
    readonly projectName: string
    readonly serviceName: string
    readonly region: string
    readonly serviceAccountName: string

    constructor(scope: Construct, projectID: string, projectName: string, serviceName: string, region: string, serviceAccountName: string) {
        this.scope = scope
        this.projectID = projectID
        this.projectName = projectName
        this.serviceName = serviceName
        this.region = region
        this.serviceAccountName = serviceAccountName
    }
}
