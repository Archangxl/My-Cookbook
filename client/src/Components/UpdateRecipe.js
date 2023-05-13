import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateRecipe = () => {

    const {userId, id} = useParams();
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [ingredient, setIngredient] = useState([]);
    const [instruction, setInstruction] = useState([]);

    const navigate = useNavigate();
    const logout = (e) => {
        axios
            .get('http://localhost:8000/api/logout', {withCredentials: true})
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    useEffect(()=> {
        axios
            .get('http://localhost:8000/api/'+userId+'/grabOneRecipe/'+ id, {withCredentials: true})
            .then(res => {
                setName(res.data.name);
                for (let i = 0; i < res.data.ingredients.length; i++) {
                    ingredient.push({['ingredient' + i.toString()]:res.data.ingredients[i].item});
                }
                for (let j = 0; j < res.data.instructions.length; j++) {
                    instruction.push({['instruction' + j.toString()]: res.data.instructions[j].step});
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/'+userId+'/updateRecipe/' + id, {withCredentials: true})
            .then(res => {
                console.log(res);
                navigate('/' + userId + '/dashboard');
            })
            .catch(err => {
                console.log('something went wrong')
                console.log(err);
            })
    }

    return (
        <>
            <nav>
                <h1>My Cookbook</h1>
                <button onClick={logout}>Logout</button>
                <Link to={'/' + userId + '/dashboard'}>Dashboard</Link>
                <button onClick={(e) => {
                    let length = ingredient.length;
                    let string = 'ingredient' + length;
                    ingredient.push({[string]: ''});
                    navigate('/'+userId+'/updateRecipe/' + id);
                }}>Add Ingredient</button>
                <button onClick={(e) => {
                    ingredient.pop();
                    navigate('/'+userId+'/updateRecipe/' + id);
                }
                }>Remove Ingredient</button>
                <button onClick={(e) => {
                    let length = instruction.length;
                    let string = 'instruction' + length;
                    instruction.push({[string] : ''});
                    navigate('/'+userId+'/updateRecipe/' + id);
                }}>Add Instruction</button>
                <button onClick={(e) => {
                    instruction.pop();
                    navigate('/'+userId+'/updateRecipe/' + id);
                }
                }>Remove Instruction</button>
            </nav>
            <header>
                <h2>Update Recipe</h2>
            </header>
            <main>

                <form onSubmit={onSubmit}>
                    
                    <p>{nameError}</p>
                    <label>Name: </label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name}></input>
                    {
                        ingredient.map((ingredients, index) => {
                            return (
                                <div key={index}>
                                    <label>Ingredient {index + 1}: </label>
                                    <input 
                                        type="text" 
                                        placeholder={ingredient[index]['ingredient' + index.toString()]}
                                        onChange={(e) => ingredient[index]['ingredient' + index.toString()] = e.target.value} 
                                    ></input>
                                </div>
                            );
                        })
                    }
                    {
                        instruction.map((instructions, index) => {
                            return (
                                <div key={index}>
                                    <label>Instruction {index + 1}: </label>
                                    <textarea 
                                    type="text"
                                    onChange={(e) => instruction[index]["instruction"+ index.toString()] = e.target.value} 
                                    placeholder={instruction[index]["instruction"+ index.toString()]}
                                    ></textarea>
                                </div>
                            );
                        })
                    }

                    <button>Create</button>
                </form>
            </main>
        </>
    );

}
export default UpdateRecipe;