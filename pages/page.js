import InsideStyles from '@/styles/Inside.module.css'
import {useState, useRef} from 'react'

// import Page from './api'
const Button = () => {
  return(
    <button>Click</button>
  )
}

const Page = ({ data, className }) => {
  // Render data...
  console.log(data.abilities);
  return (
    <>
      {data.abilities.map((ability, index) => (
        <div key={index} className={className}>{ability.ability.name}</div>
      ))}
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
  const data = await res.json()
  console.log(data);
  // Pass data to the page via props
  return { props: { data } }
}


// export default Page

export default function Inside({data}) {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive(!isActive);
  }
  return (
    <>
      <div className={InsideStyles.buttons} onClick={handleButtonClick}>點我</div>
      <Page data={data} className={`${InsideStyles.test} ${isActive ? InsideStyles.active : ''}`} />
    </>
    
  )
}
