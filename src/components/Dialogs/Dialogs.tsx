import React from "react";
import d from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {Redirect} from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import {InitialStateType} from "../../redux/dialogsReducer";


const Dialogs: React.FC<OwnPropsType> = (props) => {

    let state = props.dialogsPage;

    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    /*let newMessageBody = state.newMessageBody;*/

    let addNewMessage = (values: {newMessageBody: string}) => {
        props.sendMessage(values.newMessageBody);
    };

    if (!props.isAuth) return <Redirect to={'/login'}/>
    return (
        <div className={d.dialogs}>
            <div className={d.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={d.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
};


export default Dialogs;

type OwnPropsType = {
    dialogsPage: InitialStateType,
    sendMessage: (messageText: String) => void

}

type NewMessageFormType = {
    newMessageBody: string
}

