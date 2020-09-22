import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip';
import './App.css';

class CardEditor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            front: "",
            back: ""
        };
    }

    render() {

        const rows = this.props.cards.map((card, i) => {
            return (
                <tr key={i}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td><button data-index={i} onClick={this.deleteCard}>Delete</button></td>
                </tr>
            )
        })
        return (
            <div>
                <h2>Card Editor</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>           
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <br />
                <input onChange={this.handleChange} name="front" placeholder="Front of Card" value={this.state.front} />
                <input onChange={this.handleChange} name="back" placeholder="Back of Card" value={this.state.back} />
                <button onClick={this.addCard}>Add Card</button>
                <hr />
                <button onClick={this.props.switchMode}>Go to Viewer</button>
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    addCard = () => {
        this.props.addCard(this.state.front, this.state.back);
        this.setState({
            front: "",
            back: ""
        });
    }

    deleteCard = (event) => {
        this.props.deleteCard(event.target.dataset.index)
    }

    
}

class CardViewer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({
            isFlipped: !prevState.isFlipped
        }));
    }


    render() {

        const card = this.props.cards.map((card, i) => {
            return (
                <div key={i}>
                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                    <div  className="front">
                        <button onClick={this.handleClick}>{card.front}</button>
                    </div>
                    
                    <div className="back">
                        <button onClick={this.handleClick}>{card.back}</button>
                    </div>
                </ReactCardFlip>
                </div>

                
            )
        }); 

        return (
            <div>
                <h2>Card Viewer</h2>
                {card}
                <hr />
                <button onClick={this.props.switchMode}>Go to editor</button>
            </div>
        );
    }

}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editor: true,
            cards: [{front: "test front", back: "test back"},
                    {front: "test front 2", back: "test back 2"}]
        };
    }

    render() {
        if(this.state.editor) {
            return (
                <CardEditor 
                    cards={this.state.cards} 
                    switchMode={this.switchMode} 
                    addCard={this.addCard}
                    deleteCard={this.deleteCard}
                />
            );
        } else {
            return (
                <CardViewer 
                    cards={this.state.cards} 
                    switchMode={this.switchMode} 
                />
            )
        }
    }

    switchMode = () => {
        this.setState(state => ({
            editor: !state.editor
        }));
    }

    addCard = (front, back) => {
        this.setState(state => ({
            cards: [...state.cards, { front: front, back: back}]
        }));
    }

    deleteCard = (index) => {
        this.setState(state => {
            const cards = [...state.cards];
            cards.splice(index, 1);
            return { cards: cards };             
        });
    }

    
    
}

export default App;
