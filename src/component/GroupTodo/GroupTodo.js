import React, { useState } from "react";
import styles from "./GroupTodo.module.css";
import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";

const GroupTodo = ({
    todo,
    changeTodoToUpdate,
    deleteTodo,
    index,
    setIsEdit,

}) => {
    const [currentHoverIndex, setCurrentHoverIndex] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleEdit = (e, todo) => {
        changeTodoToUpdate(todo);
        setIsEdit(true);
    }
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    const ImageModal = () => {
        if (!isImageModalOpen) return null;

        return (
            <div className={styles.editBackground}>
                <div className={styles.editFormContainer} >
                    
                <img src={selectedImage} className={styles.largeImage} alt="Large_Image" />
                <button onClick={() => setIsImageModalOpen(false)}>
                        <img src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png" alt="close"/>
                </button>
                </div>
            </div>
        );
    };


    return (
        <li
            key={todo.id}
            className={styles.todo}
            onMouseOver={() => { setCurrentHoverIndex(index); }}
            onMouseLeave={() => { setCurrentHoverIndex(null); }}
            draggable

        >
            <div className={styles.todoDetails} >
                <span> {todo.title}</span>
                <img
                    className={`${styles.image} ${currentHoverIndex === index && styles.moveImage}`}
                    src={todo.url}
                    alt="iimage"
                    onClick={() => handleImageClick(todo.url)}
                />

            </div>
            <div className={styles.todoOptions}>
                <div className={`${styles.btnContainer} ${currentHoverIndex === index && styles.active}`}>
                    <div
                        className={styles.edit}
                        onClick={(e) => { handleEdit(e, todo); }}
                    >
                        <img src={EditImage} height="100%" alt="Edit" />
                    </div>
                    <div
                        className={styles.delete}
                        onClick={() => deleteTodo(todo)}
                    >
                        <img src={DeleteImage} height="100%" alt="Delete" />
                    </div>
                </div>
            </div>
            <ImageModal />
        </li>
    );
};

export default GroupTodo;
