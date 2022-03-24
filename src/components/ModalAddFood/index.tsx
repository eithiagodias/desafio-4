import React, { createRef, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Modal from '../Modal';
import Input from '../Input';

import { Food } from '../../interfaces/Food';

import { Form } from './styles';

interface ModalAddFoodProps {
  isOpen: boolean;
  handleOnAddFood: (food: Food) => void;
  handleOnRequestClose: () => void;
}

const ModalAddFood: React.FC<ModalAddFoodProps> = ({
  isOpen,
  handleOnAddFood,
  handleOnRequestClose,
}) => {
  const formRef = createRef<FormHandles>();

  const handleSubmit = useCallback(async (data) => {
    handleOnAddFood(data);
    handleOnRequestClose();
  }, [handleOnAddFood, handleOnRequestClose]);

  return (
    <Modal isOpen={isOpen} handleOnRequestClose={handleOnRequestClose}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;