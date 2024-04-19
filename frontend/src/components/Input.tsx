interface InputProps {
  type?: string
  name?: string
  customClass?: string
  placeholder?: string
  val?: any
  onChng?: any
  onBlr?: any
}

const Input = ({
  type,
  name,
  customClass,
  placeholder,
  onBlr,
  onChng,
  val,
}: InputProps) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        className={`form-control ${customClass}`}
        placeholder={placeholder}
        value={val}
        onChange={onChng}
        onBlur={onBlr}
      />
    </div>
  )
}

export default Input
