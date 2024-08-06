import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ADD, DLT, REMOVE } from '../redux/actions/action'
import { Button } from 'react-bootstrap'
const CardsDetails = () => {
  const [data, setData] = useState([]);
  console.log(data)
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata)
  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id
    });
    setData(comparedata)
  }
  // add data function

  const send = (e) => {
    dispatch(ADD(e))
  }
  const dlt = (id) => {
    dispatch(DLT(id))
    history("/");
  }
  // remove one function  from reducer.js
  const remove = (item) => {
    dispatch(REMOVE(item))
  }

  useEffect(() => {
    compare();
  }, [id])
  return (
    <>
      <div class="container mt-2">
        <h2 className='text-center'>Items Details Page</h2>
        <section className='container mt-3'>
          <div className='iteamsdetails'>
            {
              data.map((ele) => {
                return (
                  <>
                    <div className='items_img'>
                      <img src={ele.imgdata} alt='ninja' />
                    </div>
                    <div className='details'>
                      <Table>
                        <tr>
                          <td>
                            <p>
                              <strong>Book name</strong> : {ele.rname}
                            </p>
                            <p>
                              <strong>Price</strong> : ₹ {ele.price}
                            </p>
                            <p>
                              <strong>Address</strong> : {ele.address}
                            </p>
                            <p>
                              <strong>Total</strong> : ₹ {ele.price * ele.qnty}
                            </p>
                            <div className='mt-5 d-flex justify-content-between align-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                              <span style={{ fontSize: 24 }} onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}>-</span>
                              <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                              <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>

                            </div>
                          </td>
                          <td>
                            <p><strong>Rating :</strong><span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{ele.rating} ★</span></p>
                            <p><strong>Order Review :</strong><span >{ele.somedata}</span></p>
                            <p><strong>Remove :</strong><span ><i className='fas fa-trash' onClick={() => dlt(ele.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i></span></p>
                            <Button style={{ margin: '8px', color: "black" }} as={Link} to="/address" variant="secondary">Address Details</Button>
                          </td>
                        </tr>
                      </Table>
                    </div>

                  </>
                )
              })
            }
          </div>
        </section>
      </div >
    </>
  )
}

export default CardsDetails