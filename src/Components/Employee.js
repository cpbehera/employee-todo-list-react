import './Employee.css';
import { useState } from 'react';

const Employee = () => {

    const [inputs, setInputs] = useState({
        name: "",
        id: "",
        desgination: ""
    });

    const [tableData, setTableData] = useState([]);
    const [editClick, setEditedClick] = useState(false);
    const [editedData, setEditedData] = useState();

    const handleInputs = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const addInputData = () => {
        if (editClick) {
            const tempTableData = tableData;
            Object.assign(tempTableData[editedData],inputs);
            setTableData([...tempTableData]);
            setEditedClick(false);
            setInputs({
                name: "",
                id: "",
                desgination: ""
            })
        } else {
            setTableData([...tableData, inputs]);
            setInputs({
                name: "",
                id: "",
                desgination: ""
            })
        }
    }

    // delete operation
    const handleDelete = (ind) => {
        const filteredData = tableData.filter((item, i) => i !== ind);
        setTableData(filteredData);
    }

    // Edit operation
    const handleEdit = (ind) => {
        const tempData = tableData[ind];
        console.log(tempData);
        setInputs({
            name: tempData.name,
            id: tempData.id,
            desgination: tempData.desgination
        });
        setEditedClick(true);
        setEditedData(ind);
    }
    return (
        <>
            <div className="todocontainer">
                <div className="inputContainer">
                    <input type="text" placeholder="Enter Employee Name" name='name' required value={inputs.name} onChange={handleInputs} />
                    <input type="number" placeholder="Enter Employee Id" name='id' required value={inputs.id} onChange={handleInputs} />
                    <input type="text" placeholder="Enter Employee desgination" required name='desgination' value={inputs.desgination} onChange={handleInputs} />

                    <button className='btn btn-primary' onClick={addInputData}>{editClick ? "Update" : "Add"}</button>
                </div>

                <div className="employeeData">
                    <table className="table table-info table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Employee Name</th>
                                <th scope="col">Employee Id</th>
                                <th scope="col">Employee Desgination</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                tableData.map((item, i) => {
                                    return (
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.id}</td>
                                            <td>{item.desgination}</td>
                                            <td>
                                                <i className="fa-regular fa-pen-to-square text-success" onClick={() => handleEdit(i)}></i>&nbsp;&nbsp;&nbsp;
                                                <i className="fa-solid fa-trash text-danger" onClick={() => handleDelete(i)}></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Employee;