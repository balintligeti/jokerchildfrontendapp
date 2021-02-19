import React, { useState, useEffect } from 'react';
import PinkInfo from "../1medium/PinkInfo";
import PurpleButton from "../1small/PurpleButton";
import "./getId.css";
import "./answer.css";
import "./questions.css";
import { Link } from 'react-router-dom';
import {getSessionsCardByUserId} from "../context/ApiCalls";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PopupButton from "../1small/PopupButton";


export default function DndTest(props) {

    const questionId=props.match.params.questionId

    const [question,setQuestion]=useState(null);
    const [exerciseId,setExerciseId]=useState(null);


    useEffect(()=>{
        getSessionsCardByUserId(0) // fix value until login is not implemented
            .then((data)=>{
                setQuestion(data.data.exercises[questionId].question);
                setExerciseId(data.data.exercises[questionId].id)
                let allWords=data.data.exercises[questionId].answer.split(";");
                let badWords=allWords[1].split(",");
                const newW=(allWords[0].split(",").concat(badWords));
                setState( () => {
                    return {
                        words: newW,
                        goodWords: allWords[0].split(","),
                        items: getItems(newW.length, newW.sort().reverse()),
                        selected: getItems(0),
                    }
                })
            })           
    },[questionId])
    
    const [state,setState] = useState({
        words: [],
        goodWords: [],
        items: [],
        selected: [],
        
    })

    // fake data generator
    const getItems = (count, w) =>
        Array.from({ length: count }, (v,k) => k).map(k => ({
            id: `item-${k}`,
            content: w[k]
        }));



    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
     // Moves an item from one list to another list.
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const grid = 8;
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        margin: `0 0 ${grid}px 0`,
        borderRadius: '20px',
        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',
        height: '35px',
        color: isDragging ? 'black' : 'white',
        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        padding: grid,
        width: '35vw',
        minWidth: '200px',
        height: '100%',
    });



     // A semi-generic way to handle multiple lists. Matches the IDs of the droppable container to the names of the source arrays stored in the state.
    const id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    const getList = id => state[id2List[id]];

    const onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );


            if (source.droppableId === 'droppable2') {
                setState({
                    words: state.words,
                    goodWords: state.goodWords,
                    items: state.items,
                    selected: items
                });
            } else {
                setState({
                    words: state.words,
                    goodWords: state.goodWords,
                    items: items,
                    selected: state.selected
                });
            }

            
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setState({
                words: state.words,
                goodWords: state.goodWords,
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };





    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <PinkInfo text={question} ansOptions={`${state.goodWords.length} választ kell megadnod.`}/>
            <div className="inline">
            
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        className="firstDroppable"
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        <div>
                <p>Válasz lehetőségek:</p>
            </div>
                        {state.items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            </div>
            <div className="inline">
            <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                    <div
                        className="secondDroppable"
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                            <div>
                <p>Ide húzd a válaszaid:</p>
            </div>
                        {state.selected.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
        <div style={{marginTop: "1vw", marginBottom: '1vw'}}>
        <PopupButton text="Kész!" exerciseId={exerciseId} goodW={state.goodWords} selectedW={state.selected}/> 
        </div>
        <Link to='/questions'><PurpleButton text="Vissza a kérdésekhez!"/></Link>
        </DragDropContext>
    );
}

