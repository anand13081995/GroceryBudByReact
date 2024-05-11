import { useState, useEffect } from 'react'


const App = () => {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('groceryItems')) || []);

  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (inputText.trim() !== '') {
      setItems([...items, { name: inputText, checked: false }]);
      setInputText('');
    }
  };

  const toggleChecked = (index) => {
    setItems(items.map((item, i) => i === index ? { ...item, checked: !item.checked } : item));
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{paddingLeft:'25%'}}>
      <div style={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', display:'flex', flexDirection:'column' , alignItems:'center', width:'50vw', marginTop:'10%'}}>
            <h1 style={{}}>Grocery Bud</h1>
            <div style={{display:'flex', gap:'20px', marginTop:'1%', marginBottom:'1%'}}>
              <input
                type="text"
                placeholder="Add Item"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button style={{backgroundColor:'rgb(14,116,144)', color:'white', width:'8vw', height:'5vh', border:'none', borderRadius:'10px'}} onClick={addItem}>Add Item</button>
            </div>
            <ol style={{ padding: 0}}>
              {items.map((item, index) => (
                <li key={index} style={{ display:'flex', justifyContent:'space-between', width:'20vw', marginTop:'6%'}}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleChecked(index)}
                  />
                  <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                    {item.name}
                  </span>
                  <button onClick={() => deleteItem(index)} style={{color:'white', backgroundColor:'black', border:'none', width:'3vw' ,borderRadius:'10px' }} >Delete</button>
                </li>
              ))}
            </ol>
          </div>
    </div>
    
  );
};

export default App;