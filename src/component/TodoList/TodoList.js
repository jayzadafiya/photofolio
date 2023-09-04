import styles from "./TodoList.module.css";
import GroupTodo from "../GroupTodo/GroupTodo";
import React, { useState, useRef, useEffect } from 'react'
import TodoForm from "../TodoForm/TodoForm";
import Logo from "../../images/logo.png"
const TodoList = ({
    group,
    deleteTodo,
    changeTodoToUpdate,
    updateTodoList,
    addTodo,
    todoToUpdate,
    updateTodo,
    resetTodoToupdate,
    updateAlbumList
}) => {
    const [list, setList] = useState();
    const [dragging, setDragging] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [clickedGroupIndex, setClickedGroupIndex] = useState(null);
    const [newAlbumName, setNewAlbumName] = useState("");
    const [isAddAlbum, setIsAddAlbum] = useState(false);

    useEffect(() => {
        setList(group);
    }, [group]);
    const dragItem = useRef();
    const dragItemNode = useRef();

    const handletDragStart = (e, params) => {

        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = params;
        setTimeout(() => {
            setDragging(true);
        }, 0)
    }

    const handleDragEnter = (e, targetItem) => {
        if (dragItemNode.current !== e.target) {

            setList(oldList => {
                try {
                    const newList = [...oldList];
                    const draggedItem = newList[dragItem.current.grpI].items.splice(dragItem.current.itemI, 1)[0];
                    draggedItem.albumID = targetItem.grp.id;
                    console.log(draggedItem)
                    console.log(targetItem.grp.id);
                    newList[targetItem.grpI].items.splice(targetItem.itemI, 0, draggedItem);
                    dragItem.current = targetItem;
                    return newList;
                } catch (error) {
                    console.error("Error updating list:", error);
                    return oldList;
                }
            });
        }
    }

    const handleDragEnd = (e) => {
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
        updateTodoList(list);
    }

    const getStyles = (item) => {
        if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
            return (styles.dndItem, styles.current)
        }
        return styles.dndItem
    }

    const handleAdd = (e, grpI) => {
        setClickedGroupIndex(grpI);
        setIsAdd(true);
    }

    const handleAddAlbum = () => {
        if (newAlbumName.trim() !== "") {
            const newGroup = {
                title: newAlbumName,
                items: []
            };
            updateAlbumList(newGroup);
            setList([...list, newGroup]);
            setNewAlbumName("");
        }
        setIsAddAlbum(!isAddAlbum);
        console.log(list);
    }

    return (
        <>
            <div className={styles.navTitle}>
                <div className={styles.navLeft}>

                    <img alt="todo" className={styles.navImg} src={Logo} />
                    <span className={styles.navTitleText}>PhotoFolio</span>
                </div>
                <div className={styles.addText} onClick={handleAddAlbum}>
                    <img alt="plus" src="https://cdn-icons-png.flaticon.com/128/1828/1828925.png" />
                    <span >Add an album</span>
                </div>
            </div>
            <div className={styles.drag_n_drop}>

                {list?.map((grp, grpI) => (

                    <div key={grp.title}
                        className={styles.dndDroup}
                        onDragEnter={dragging && !grp?.items.length ? (e) => handleDragEnter(e, { grp, grpI, itemI: 0 }) : null}
                    >
                        <div className={styles.groupTitle}>{grp?.title}</div>
                        {grp.items.map((item, itemI) => (
                            <>
                                <div draggable key={item.id}
                                    className={dragging ? getStyles({ grpI, itemI }) : styles.dndItem}
                                    onDragStart={(e) => handletDragStart(e, { grpI, itemI, item })}
                                    onDragEnter={dragging ? (e) => { handleDragEnter(e, { grp, grpI, itemI }) } : null}
                                >
                                    <GroupTodo
                                        index={itemI}
                                        key={item.id}
                                        todo={item}
                                        deleteTodo={deleteTodo}
                                        changeTodoToUpdate={changeTodoToUpdate}
                                        setIsEdit={setIsEdit}
                                    />
                                </div>
                            </>

                        ))}
                        {isEdit && (
                            <div className={styles.editBackground}>
                                <div className={styles.editFormContainer}>
                                    <TodoForm
                                        addTodo={addTodo}
                                        todoToUpdate={todoToUpdate}
                                        updateTodo={updateTodo}
                                        resetTodoToupdate={resetTodoToupdate}
                                        resetTodoToEdit={() => setIsEdit(false)}
                                        setIsEdit={setIsEdit}
                                        groupId={grp.id}

                                    />
                                </div>
                            </div>
                        )}
                        {(clickedGroupIndex === grpI && isAdd) ? <TodoForm
                            addTodo={addTodo}
                            todoToUpdate={todoToUpdate}
                            updateTodo={updateTodo}
                            resetTodoToupdate={resetTodoToupdate}
                            setIsAdd={setIsAdd}
                            groupId={grp.id}

                        /> : null}
                        <div className={styles.addText} onClick={(e) => handleAdd(e, grpI)}>
                            <img alt="plus" src="https://cdn-icons-png.flaticon.com/128/1828/1828925.png" />
                            <span >Add a image</span>
                        </div>
                    </div>
                ))}
                <div >

                    {isAddAlbum && (
                        <div className={styles.albumForm}>
                            <div className={styles.albumContainer}>

                                <span>Create an album </span>
                                <hr/>
                                <div className={styles.inputContainer}>
                                    <input
                                        type="text"
                                        placeholder="Album Name"
                                        value={newAlbumName}
                                        className={styles.input}
                                        onChange={(e) => setNewAlbumName(e.target.value)}
                                    />
                                    <button onClick={(e) => setNewAlbumName("")} className={`${styles.submitBtn} ${styles.clearBtn}`}>Clear</button>
                                    <button onClick={handleAddAlbum} className={styles.submitBtn}>Create</button>

                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};

export default TodoList;
