import { Button, Modal } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessModal = ({openModal, onCancel}) => {
    const navigate = useNavigate()
  
  return (
    <Modal
    visible={openModal}
    onCancel={onCancel}
    footer={null}
    centered
  >
    <div className="text-center">
      <img
        src="https://img.icons8.com/color/96/000000/ok--v1.png"
        alt="Success"
        className="mx-auto mb-4"
      />
      <h2 className="text-lg font-bold">Product added successfully!</h2>
      <div className="mt-4">
        <Button
          type="primary"
          className="bg-orange-500 w-full mb-2"
          onClick={() => navigate("/prodduct/add")}
        >
          Add a New Product
        </Button>
        <Button
          className="w-full border-orange-500 text-orange-500"
          onClick={() => navigate("/vendor/products")}
        >
          Go to Manage Products
        </Button>
      </div>
    </div>
  </Modal>
  )
}

export default SuccessModal