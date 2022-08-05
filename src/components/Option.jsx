//react component for options

const Options = ({option,index,choosedOption})=>{

    return (
       <div id={index} className={`option`} onClick={()=>choosedOption(option,index)}>
        <span>{index+1}. {option}</span>
       </div>
    )
  }

  export default Options