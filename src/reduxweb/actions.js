import {Types} from './types'
export const AddNameAction=(name)=>({
    type:Types.AddUserName,
    payload:name,
})

export const AddUser=(payload)=>({
    type:Types.AddUser,
    payload:payload,

})

export const AddEmailAction=(email)=>({
    type:Types.AddEmail,
    payload:email,
})
export const SetSocketAction=(socket)=>({
    type:Types.SetSocket,
    payload:socket,
})


export const SetRoomIdAction=(roomId)=>({
    type:Types.SetRoomId,
    payload:roomId,
})


export const SetCallToUserAction=(user)=>({
    type:Types.SetCallToUser,
    payload:user,
})
export const SetCallFromAction=(user)=>({
    type:Types.SetCallFrom,
    payload:user,
})

export const SetCallStatusAction=(status)=>({
    type:Types.SetCallStatus,
    payload:status,
})




export const createEvent=task=>
({
    type: Types.CREATE_ITEM,
    payload :task
});

export const deleteEvent =id =>
({
    type: Types.DELETE_ITEM,
    payload: id
});


export const editEvent=task=>
({
    type: Types.EDIT_ITEM,
    payload :task
});
