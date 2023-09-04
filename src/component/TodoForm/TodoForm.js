import React, { useEffect, useRef } from "react";
import styles from "./TodoForm.module.css";

const TodoForm = ({
    addTodo,
    todoToUpdate,
    updateTodo,
    resetTodoToupdate,
    setIsAdd,
    setIsEdit,
    groupId,
}) => {
    const albumTitle = useRef();
    const albumUrl = useRef();
    useEffect(() => {
        if (!todoToUpdate) return;
        albumTitle.current.value = todoToUpdate?.title;
        albumUrl.current.value = todoToUpdate?.url;
    }, [todoToUpdate]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const albumTitleText = albumTitle?.current.value;
        const albumUrlLink = albumUrl?.current.value;
        if (!todoToUpdate) {
            const todo = {
                title: albumTitleText,
                url: albumUrlLink,
                albumID: groupId
            };
            await addTodo(todo);
            setIsAdd(false);
            clearInput();
            return;
        }

        const todo = {
            title: albumTitleText,
            url: albumUrlLink,
            id: todoToUpdate.id,
            albumID: todoToUpdate.albumID,

        };
        const result = await updateTodo(todo);
        setIsEdit(false);
        clearInput();
        resetTodoToupdate();
        if (!result) return;
    };

    const clearInput = () => {
        albumUrl.current.value = "";
        albumTitle.current.value = "";
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                {todoToUpdate ? (<><h3>Edit Form</h3><hr /></>) : null}
            </div>
            <div className={styles.form}>
                {todoToUpdate ? <label>Title: </label> : null}

                <input
                    id="albumTitle"
                    className={styles.input}
                    type="text"
                    placeholder="Title"
                    ref={albumTitle}
                    required
                />
                {todoToUpdate ? <label>Url: </label> : null}

                <textarea
                    className={styles.input}
                    id="albumUrl"
                    type="text"
                    placeholder="&#9679; URL"
                    ref={albumUrl}
                    required
                />
            </div>
            {!todoToUpdate &&
                <button onClick={clearInput} className={`${styles.submitBtn} ${styles.clearBtn}`}>Clear</button>
            }

            <button className={styles.submitBtn} >
                {todoToUpdate ? "Edit " : "Add "} image
            </button>
        </form >
    );
};

export default TodoForm;
