import React from "react"

interface ContainerProps {
  customClass?: string
  id?: string
  children: any
}

const Container = ({ children, customClass, id }: ContainerProps) => {
  return (
    <section className={customClass} id={id}>
      <div className="container-xxl">{children}</div>
    </section>
  )
}

export default Container
