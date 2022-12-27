import React, { useEffect, useState, useRef } from "react";
import { NumberInput, Group, ActionIcon, Flex, Button } from "@mantine/core";
import { BACKEND_URL } from "../constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewTransactionForm = () => {
  const [apples, setApples] = useState();
  const [bananas, setBananas] = useState();
  const [pears, setPears] = useState();
  const [oranges, setOranges] = useState();
  const [applesQty, setApplesQty] = useState(0);
  const [bananasQty, setBananasQty] = useState(0);
  const [pearsQty, setPearsQty] = useState(0);
  const [orangesQty, setOrangesQty] = useState(0);
  const [appleStock, setAppleStock] = useState(0);
  const [bananaStock, setBananaStock] = useState(0);
  const [pearStock, setPearStock] = useState(0);
  const [orangeStock, setOrangeStock] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const appleHandlers = useRef(0);
  const bananaHandlers = useRef(0);
  const pearHandlers = useRef(0);
  const orangeHandlers = useRef(0);

  useEffect(() => {
    const fetchApples = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/products/product`, {
          params: {
            name: "apple",
          },
        });
        setApples(response.data);
        setAppleStock(response.data.stock);

        const response2 = await axios.get(`${BACKEND_URL}/products/product`, {
          params: {
            name: "banana",
          },
        });
        setBananas(response2.data);
        setBananaStock(response2.data.stock);

        const response3 = await axios.get(`${BACKEND_URL}/products/product`, {
          params: {
            name: "pear",
          },
        });
        setPears(response3.data);
        setPearStock(response3.data.stock);

        const response4 = await axios.get(`${BACKEND_URL}/products/product`, {
          params: {
            name: "orange",
          },
        });
        setOranges(response4.data);
        setOrangeStock(response4.data.stock);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchApples();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();

    setTotalPrice(
      applesQty * apples.unitPrice +
        bananasQty * bananas.unitPrice +
        pearsQty * pears.unitPrice +
        orangesQty * oranges.unitPrice
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(`${BACKEND_URL}/transactions`, {
      totalPrice,
    });

    await axios.post(`${BACKEND_URL}/orders`, {
      applesQty,
      bananasQty,
      pearsQty,
      orangesQty,
      applesId: apples.id,
      bananasId: bananas.id,
      pearsId: pears.id,
      orangesId: oranges.id,
      transactionId: response.data.id,
    });

    const applesNewQty = appleStock - applesQty;
    const bananasNewQty = bananaStock - bananasQty;
    const pearsNewQty = pearStock - pearsQty;
    const orangesNewQty = orangeStock - orangesQty;

    await axios.put(`${BACKEND_URL}/products/${apples.id}`, {
      productId: apples.id,
      stock: applesNewQty,
    });

    await axios.put(`${BACKEND_URL}/products/${bananas.id}`, {
      productId: bananas.id,
      stock: bananasNewQty,
    });

    await axios.put(`${BACKEND_URL}/products/${pears.id}`, {
      productId: pears.id,
      stock: pearsNewQty,
    });

    await axios.put(`${BACKEND_URL}/products/${oranges.id}`, {
      productId: oranges.id,
      stock: orangesNewQty,
    });

    // Clear form state
    setTotalPrice(0);
    setApplesQty(0);
    setBananasQty(0);
    setPearsQty(0);
    setOrangesQty(0);
    navigate(`/`);
  };

  return (
    <Flex
      mih={50}
      gap="lg"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      Apples
      <Group spacing={5}>
        <ActionIcon
          size={42}
          variant="default"
          onClick={() => appleHandlers.current.decrement()}
        >
          –
        </ActionIcon>
        <NumberInput
          hideControls
          value={applesQty}
          onChange={(val) => setApplesQty(val)}
          handlersRef={appleHandlers}
          max={appleStock}
          min={0}
          step={1}
          styles={{ input: { width: 54, textAlign: "center" } }}
        />
        <ActionIcon
          size={42}
          variant="default"
          onClick={() => appleHandlers.current.increment()}
        >
          +
        </ActionIcon>
      </Group>
      Bananas
      <Group spacing={5}>
        <ActionIcon
          size={42}
          variant="default"
          onClick={() => bananaHandlers.current.decrement()}
        >
          –
        </ActionIcon>
        <NumberInput
          hideControls
          value={bananasQty}
          onChange={(val) => setBananasQty(val)}
          handlersRef={bananaHandlers}
          max={bananaStock}
          min={0}
          step={1}
          styles={{ input: { width: 54, textAlign: "center" } }}
        />
        <ActionIcon
          size={42}
          variant="default"
          onClick={() => bananaHandlers.current.increment()}
        >
          +
        </ActionIcon>
      </Group>
      Pears
      <Group spacing={5}>
        <ActionIcon
          size={42}
          variant="default"
          onClick={() => pearHandlers.current.decrement()}
        >
          –
        </ActionIcon>
        <NumberInput
          hideControls
          value={pearsQty}
          onChange={(val) => setPearsQty(val)}
          handlersRef={pearHandlers}
          max={pearStock}
          min={0}
          step={1}
          styles={{ input: { width: 54, textAlign: "center" } }}
        />
        <ActionIcon
          size={42}
          variant="default"
          onClick={() => pearHandlers.current.increment()}
        >
          +
        </ActionIcon>
      </Group>
      Oranges
      <Group spacing={5}>
        <ActionIcon
          size={42}
          variant="default"
          onClick={() => orangeHandlers.current.decrement()}
        >
          –
        </ActionIcon>
        <NumberInput
          hideControls
          value={orangesQty}
          onChange={(val) => setOrangesQty(val)}
          handlersRef={orangeHandlers}
          max={orangeStock}
          min={0}
          step={1}
          styles={{ input: { width: 54, textAlign: "center" } }}
        />
        <ActionIcon
          size={42}
          variant="default"
          onClick={() => orangeHandlers.current.increment()}
        >
          +
        </ActionIcon>
      </Group>
      <h2>Total Price: {`${totalPrice}`}</h2>
      <Button onClick={handleClick}>Calculate</Button>
      <Button onClick={handleSubmit}>Submit</Button>
    </Flex>
  );
};

export default NewTransactionForm;
