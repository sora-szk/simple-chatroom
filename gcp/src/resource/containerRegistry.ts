import { ContainerRegistry, ContainerRegistryConfig } from '../../.gen/providers/google/container-registry'
import { Template } from './template'

export class ContainerRegistryResource extends Template {
    location?: string
    inject(data: {
        location: string
    }): ContainerRegistryResource{
        this.location = data.location;
        return this;
    }
    gen(): ContainerRegistry {
        if(!this.location){
            throw Error("inject() must be called before gen()")
        }
        const containerRegistryConfig: ContainerRegistryConfig = {
            location: this.location,
            project: this.projectID,
        }
        return new ContainerRegistry(
            this.scope,
            `${this.projectName}-${this.serviceName}-container-registry`,
            containerRegistryConfig
        );
    }
}