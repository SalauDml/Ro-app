

export default function SubHeader({ state, setState }) {

    const handleSelectChange = (event) => {
        setState(event.target.value);
    };

    return (
        <div className="bg-white p-1 rounded-md flex-row-between sub-header">
            <div>
                <select className="dropdown_menu" onChange={handleSelectChange}>
                    <option value="">Category</option>
                    <option value="Smartphone">Phone</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Polo Shirt">Shirt</option>
                    <option value="Glasses">Glasses</option>
                    <option value="Jeans">Jeans</option>
                </select>
            </div>

            <div>Selected Value: { state === "" ? "All": state }</div>
        </div>
    );
}
