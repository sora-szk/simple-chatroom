import { DirectMessagePresentModel } from '../../../app/adapters/response/models/directMessagePresentModel'
import { DirectMessagePresenter } from '../../../app/adapters/response/presenters/directMessagePresenter'
import { DirectMessageModel } from '../../../app/domain/entities/models/directMessageModel'

export class DirectMessagePresenterImpl implements DirectMessagePresenter {
    detail(source: DirectMessageModel | null): DirectMessagePresentModel | null {
        return source
            ? {
                  direct_message_doc_id: source.directMessageDocID,
                  direct_message_id: source.directMessageID,
                  sender: source.sender,
                  receiver: source.receiver,
                  text: source.text,
                  image: source.image,
                  created_at: source.createdAt.toISOString(),
                  updated_at: source.updatedAt.toISOString(),
              }
            : null
    }

    listDetails(source: (DirectMessageModel | null)[]): DirectMessagePresentModel[] {
        return source
            .filter((v) => v !== null)
            .map((v) => this.detail(v)) as DirectMessagePresentModel[]
    }
}
