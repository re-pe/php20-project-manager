import React from 'react'
import classNames from 'classnames'
import { Container } from 'react-bootstrap'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useSidebarContext } from '../../context/SidebarContext'
import CreateTaskForm from '../../components/CreateTaskForm'

export default function CreateTask() {
  const { isOpen } = useSidebarContext
  return (
    <Container fluid className={classNames('content', { 'is-open': isOpen })}>
      <Header title="Create Task" />
      <CreateTaskForm />
      <Footer />
    </Container>
  )
}
