import { printIntrospectionSchema } from 'graphql'
import React from 'react'
import { useState } from 'react'
import ReactModal from 'react-modal'

export default function LoadingModal(props) {
  return (
    <ReactModal
      isOpen={this.state.showModal}
      contentLabel="onRequestClose Example"
      onRequestClose={this.handleCloseModal}
      className="Modal"
      overlayClassName="Overlay"
    >
      <p>Modal text!</p>
      <button onClick={this.handleCloseModal}>Close Modal</button>
    </ReactModal>
  )
}
