import React from 'react';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../store/cartSlice';
import { getProducts } from '../store/productSlice';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const Product = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  const { data: products, status } = useSelector((state) => state.products);
  useEffect(() => {
    //dispatch a function to get all products
    dispatch(getProducts());
    /* //api
    fetch('https://fakestoreapi.com/products')
      .then((data) => data.json())
      .then((result) => setProduct(result)); */
  }, []);
  if (status === 'Loading ...') {
    return <Spinner animation='grow' />;
  }

  if (status === 'error') {
    return (
      <Alert variant='danger'>
        <Alert.Heading>Something went wrong here!</Alert.Heading>
      </Alert>
    );
  }
  const addToCart = (product) => {
    // dispatch add function
    dispatch(add(product));
  };

  const removeFromCart = (id) => {
    //dispatch remove function
    dispatch(remove(id));
  };

  const cards = products.map((product) => (
    <div className='col-md-3' style={{ marginBottom: '10px' }}>
      <Card key={product.id} className='h-100'>
        <div className='text-center'>
          <Card.Img
            variant='top'
            src={product.image}
            style={{ width: '100px', height: '130px' }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ background: 'white' }}>
          {cartProducts.some((item) => item.id === product.id) ? (
            <Button
              variant='primary'
              onClick={() => removeFromCart(product.id)}
            >
              Remove
            </Button>
          ) : (
            <Button variant='primary' onClick={() => addToCart(product)}>
              Add to cart
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <>
      <h1>Product Dashboard</h1>
      <div className='row'>{cards}</div>
    </>
  );
};

export default Product;
