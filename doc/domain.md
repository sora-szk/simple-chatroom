# domain

1. UserProfile:
   - Entity
     - uid: string
     - nickname: string | null
     - bio: string | null
     - gender: 'men' | 'women' | 'other' | null
     - age: number | null
     - hobby: string | null
   - Functions
     - createUserProfile
     - updateUserProfile
     - getUserProfile

1. privateUserProfile:
   - Entity:
     - uid: string
     - email: string
   - Functions
     - createPrivateUserProfile
     - updatePrivateUserProfile
     - getPrivateUserProfile

2. ChatRoom:
   - Entity:
     - roomID: string
     - name: string
     - creator: uid
     - editorList: List\<uid\>
     - whiteList: List\<uid\> | null
       - nullのとき、誰でも参加可能
     - blackList: List\<uid\>
   - Functions
     - createChatRoom
     - getChatRoomDetail
     - getChatRoomList
     - joinChatRoom
       - editorListに実行ユーザを追加する
       - whiteListのメンバーのみ実行可能
     - inviteChatRoom
       - whiteListにメンバーを追加する
       - editorListのメンバー全員が実行可能
     - expalChatRoom
       - blackListにメンバーを追加、editorListからメンバーを削除する
       - editorListのメンバー全員が実行可能
         - whiteList === nullのときcreatorのみ実行可能

3. RoomMessage:
   - Entity
     - roomMessageID: string
     - roomID: string
     - sender: uid
     - text: string
     - image: string(base64Encoded)
   - Functions
     - sendRoomMessage
     - getRoomMessage
     - getRoomMessageList

4. DirectMessage:
   - Entity
     - directMessageID: string
     - sender: uid
     - receiver: uid
     - text: string
     - image: string(base64Encoded)
   - Functions
     - sendDirectMessage
     - getDirectMessage
     - getDirectMessageList

5. Notification:
   - Entity
     - notificationID: string
     - receiver: uid
     - title: string
     - message: string
   - Functions
     - pushNotification
     - getNotificationDetail
     - getNotificationList