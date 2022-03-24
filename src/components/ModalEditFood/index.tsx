import React, { createRef, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../Modal';
import Input from '../Input';
import { Food } from '../../interfaces/Food';

import { Form } from './styles';

interface ModalEditFoodProps {
  editingFood: Food;
  isOpen: boolean;
  handleOnUpdateFood: (food: Food) => void;
  handleOnRequestClose: () => void;
}


const ModalEditFood: React.FC<ModalEditFoodProps> = ({
  editingFood,
  isOpen,
  handleOnRequestClose,
  handleOnUpdateFood,
}) => {

  const formRef = createRef<FormHandles>();

  const handleSubmit = useCallback(async (data) => {
    handleOnUpdateFood(data);
    handleOnRequestClose();
  }, [handleOnUpdateFood, handleOnRequestClose]);


  return (
    <Modal isOpen={isOpen} handleOnRequestClose={handleOnRequestClose}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalEditFood;