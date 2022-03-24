import React, { useState, useEffect, useCallback } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import { Food as IFood } from '../../interfaces/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const handleAddFood = useCallback(async (food: IFood) => {

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods(oldState => [...oldState, response.data]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleUpdateFood = useCallback(async (food: IFood) => {

    try {

      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      );

      setFoods((oldState) => oldState.map(f => f.id !== foodUpdated.data.id ? f : foodUpdated.data));

    } catch (err) {
      console.log(err);
    }
  }, [editingFood]);

  const handleDeleteFood = useCallback(async id => {
    await api.delete(`/foods/${id}`);
    setFoods((oldState) => oldState.filter(food => food.id !== id));
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(oldState => !oldState);
  }, []);

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(oldState => !oldState);
  }, []);

  const handleEditFood = useCallback((food: IFood) => {
    setEditingFood(food);
    setEditModalOpen(true);
  }, []);

  const loadFoods = useCallback(async () => {
    const response = await api.get<IFood[]>('/foods');
    setFoods(response.data);
  }, []);

  useEffect(() => {
    loadFoods();
  }, [loadFoods])

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        handleOnRequestClose={toggleModal}
        handleOnAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        handleOnRequestClose={toggleEditModal}
        handleOnUpdateFood={handleUpdateFood}
        editingFood={editingFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}


export default Dashboard;
