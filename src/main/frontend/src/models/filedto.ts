export interface FileDTO {
    id : string,
    userId : string,
    name : string,
    description : string,
    content : string,
    language : string
    starred : boolean
    createdAt : string
    updatedAt : string
    currentVersionId : number
    collectionId : string
}