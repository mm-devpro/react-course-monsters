import React, {Component, setState, useState, useEffect, memo} from 'react';
import './App.css';
import Membre from "./components/Membre";
import Button from "./components/Button";
import Header from "./components/Header";

const famille = {
    membre1: {
        nom: 'Mika',
        age: 33
    },
    membre2: {
        nom: 'Manue',
        age: 33
    },
    membre3: {
        nom: 'Annie',
        age: 63
    },
    membre4: {
        nom: 'Buckley',
        age: 7
    }
}
//------------- PAR LA FUNCTION -------------//

// function App () {
//
//     const [age, setAge] = useState(famille.membre1.age)
//     const AgeIncrement = () => {
//         setAge(age + 1)
//         console.log(age)
//     }
//     useEffect(() => {
//         document.title = `Vous avez cliqué ${age} fois`;
//     });
//         return (
//             <div className='App'>
//                 <h1>Ma famille de premier projet React</h1>
//                 <Membre
//                     age={age}
//                     nom={famille.membre1.nom}/>
//                 <Membre
//                     age={famille.membre2.age}
//                     nom={famille.membre2.nom}/>
//                 <Membre
//                     age={famille.membre3.age}
//                     nom={famille.membre3.nom}/>
//                 <Membre
//                     age={famille.membre4.age}
//                     nom={famille.membre4.nom}>
//                     <strong>Je suis un chien.</strong>
//                 </Membre>
//                 <button
//                     onClick={AgeIncrement}>
//                     Vieillir
//                 </button>
//             </div>
//         )
//
// }


//----------- Par la Classe ---------------------//

class App extends Component {
    state = {
        famille,
        isDisplayed: false
    }
    handleClick = (num) => {
        const famille = {...this.state.famille}
        famille.membre1.age += num
        this.setState({famille})
    }
    handleChange = (event, id) => {
        const famille = {...this.state.famille}
        const nom = event.target.value
        famille[id].nom = nom
        this.setState({famille})
    }
    hideName = id => {
        const famille = {...this.state.famille}
        famille[id].nom = 'X'
        this.setState({famille})
    }

    handleShowDescription = () => {
        const isDisplayed = !this.state.isDisplayed
        this.setState({isDisplayed})
    }


    render() {
        const {titre} = this.props
        const {famille, isDisplayed} = this.state

        let description = null;

        if (isDisplayed) {
            description = <strong>Je suis un chien.</strong>
        }

        const liste = Object.keys(famille).map(membre => (
            <Membre
                key={membre}
                handleChange={event => this.handleChange(event, membre)}
                hideName={() => this.hideName(membre)}
                age={famille[membre].age}
                nom={famille[membre].nom}/>
        ))


        return (
            <div className="App">
                <Header/>
                <h1>{titre}</h1>
                {liste}
                {/*<Membre
                    age={famille.membre4.age}
                    nom={famille.membre4.nom}>
                    {description}
                    <button onClick={this.handleShowDescription}>
                        {
                            isDisplayed ? "Cacher" : 'Montrer'
                        }
                    </button>
                </Membre>*/}
                <Button
                    vieillir={() => this.handleClick(2)}/>
            </div>
        )
    }
}

export default App;
