import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import heroImg from '../assets/images/hero.png'
import '../styles/hero-section.css'
import { useNavigate } from 'react-router-dom'
import Category from '../components/UI/category/Category'
import '../styles/home.css'
import whyImg from "../assets/images/location.png";
import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";
import foodCategoryImg01 from "../assets/images/hamburger.png";
import products from "../assets/fake-data/products.js";
import networkImg from "../assets/images/Allustration.png";
import ProductCard from '../components/UI/product-card/ProductCard.js'
import TestimonialSlider from './../components/UI/slider/TestimonialSlider';
import { getAllCategory } from '../api/categoryApi.js'
import { getAllPolpularFood, getPopularFoodByCategory } from '../api/foodApi.js'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const featureData = [
    {
        title: "Quick Delivery",
        imgUrl: featureImg01,
        desc: "Our delivery is always punctual and often faster, exceeding expectations by consistently arriving on time."
    },

    {
        title: "Super Dine In",
        imgUrl: featureImg02,
        desc: "Not only fast, our delivery is also reliable, ensuring that quality remains our number one priority.",
    },
    {
        title: "Best Quality",
        imgUrl: featureImg03,
        desc: "Not only fast, but for us, quality is also paramount, making it our number one priority.",
    },
];
const Home = () => {
    const [category, setCategory] = useState("ALL");
    const [allProducts, setAllProducts] = useState(products);
    const [categories, setCategories] = useState([]);
    const [popularItems, setPopularItems] = useState([])
    const [hotPizza, setHotPizza] = useState([]);
    const [popularFoodItems, setPopularFoodItems] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const filteredPizza = products.filter((item) => item.category === "Pizza");
        const slicePizza = filteredPizza.slice(0, 4);
        setHotPizza(slicePizza);

    }, []);

    useEffect(() => {
        if (category === "ALL") {
            setAllProducts(products);
        }

        if (category === "BURGER") {
            const filteredProducts = products.filter(
                (item) => item.category === "Burger"
            );

            setAllProducts(filteredProducts);
        }

        if (category === "PIZZA") {
            const filteredProducts = products.filter(
                (item) => item.category === "Pizza"
            );

            setAllProducts(filteredProducts);
        }

        if (category === "BREAD") {
            const filteredProducts = products.filter(
                (item) => item.category === "Bread"
            );

            setAllProducts(filteredProducts);
        }
    }, [category]);

    const handleOrderFood = () => {
        navigate('/foods')
    }

    const fetchAllCategories = async () => {
        const allCategoriesData = await getAllCategory();
        if (allCategoriesData?.categories) {
            const firstFiveCategories = allCategoriesData.categories.slice(0, 5);
            setCategories(firstFiveCategories);
        }
    };

    const getPoplarFoodItems = async () => {
        const allPopularItems = await getAllPolpularFood();
        if (allPopularItems?.popularFoods) {
            setPopularItems(allPopularItems?.popularFoods)
        }
    }



    useEffect(() => {
        fetchAllCategories()
        getPoplarFoodItems()
    }, [])


    const getPopularFoodItemsByCategory = async (category_name) => {
        const popularItemsByCategory = await getPopularFoodByCategory(category_name);

        if (popularItemsByCategory.success) {
            if (popularItemsByCategory.data.foods) {
                setPopularFoodItems(popularItemsByCategory.data.foods);
            } else {
                toast.error('No popular foods found for this category');
            }
        } else {
            toast.error(`${popularItemsByCategory.error}`);
        }
    };

    return <Helmet title="Home">
        <section>
            <Container>
                <Row>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <Col lg='6' md='6'>
                        <div className='hero__content'>
                            <h5 className='mb-3'>Eat the best</h5>
                            <h1 className='mb-4 hero__title'><span>
                                Explore and understand the culture more <br /></span>
                                by tasting the amazing dishes of that <span> culture...
                                </span></h1>
                            <div className='hero__btns d-flex align-items-center gap-5 mt-4'>
                                <button className='order__btn' onClick={handleOrderFood}>Order Food
                                    <i className='ri-arrow-right-s-line'></i>
                                </button>
                            </div>
                            <div className='hero__service d-flex align-items-center gap-5 mt-5'>
                                <p className='d-flex align-items-center gap-2'><span className='shipping__icon'><i className="ri-car-line"></i></span> Quick Delivery</p>
                                <p className='d-flex align-items-center gap-2'><span className='shipping__icon'><i className="ri-shield-check-line"></i></span> 100% secure payment</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg='6' md='6'>
                        <div className='hero__img'>
                            <img src={heroImg} alt="hero-img" className='w-100' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className='pt-0'>
            <Category />
        </section>
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='text-center'>
                        <h5 className='feature__subtitle mb-4'>What we serve</h5>
                        <h2 className='feature__title'>Your Favorite </h2>
                        <h2 className='feature__title'>Food <span>Delivery Partner</span></h2>
                        <p className='mt-4 mb-1 feature__text'>Discover food wherever and whenever and get your food delivered quickly.</p>
                        <p className='feature__text'>Our job is to filling your tummy with delicious food and with fast delivery.</p>
                    </Col>
                    {featureData.map((item, index) => (
                        <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                            <div className="feature__item text-center px-5 py-3">
                                <img
                                    src={item.imgUrl}
                                    alt="feature-img"
                                    className="w-25 mb-3"
                                />
                                <h5 className=" fw-bold mb-3">{item.title}</h5>
                                <p>{item.desc}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="text-center">
                        <h2>Popular Foods</h2>
                    </Col>

                    <Col lg="12">
                        <div className="food__category d-flex align-items-center justify-content-center gap-4">
                            {categories.map(cat => (
                                <button
                                    key={cat._id}
                                    className={`d-flex align-items-center gap-2 ${category === cat ? "foodBtnActive" : ""}`}
                                    onClick={() => getPopularFoodItemsByCategory(cat.title)}
                                >
                                    <img src={foodCategoryImg01} alt="" />
                                    {cat.title}
                                </button>
                            ))}
                        </div>

                    </Col>

                    {popularFoodItems.map((item) => (
                        <Col lg="3" md="4" sm="6" xs="6" key={item._id} className="mt-5">
                            <ProductCard item={item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
        <section className="why__choose-us">
            <Container>
                <Row>
                    <Col lg="6" md="6">
                        <img src={whyImg} alt="why-tasty-treat" className="w-100" />
                    </Col>

                    <Col lg="6" md="6">
                        <div className="why__tasty-treat">
                            <h2 className="tasty__treat-title mb-4">
                                Why <span>Foody Nest?</span>
                            </h2>
                            <p className="tasty__treat-desc">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Dolorum, minus. Tempora reprehenderit a corporis velit,
                                laboriosam vitae ullam, repellat illo sequi odio esse iste
                                fugiat dolor, optio incidunt eligendi deleniti!
                            </p>

                            <ListGroup className="mt-4">
                                <ListGroupItem className="border-0 ps-0">
                                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                                        <i className="ri-checkbox-circle-line"></i> Fresh and tasty
                                        foods
                                    </p>
                                    <p className="choose__us-desc">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                        Quia, voluptatibus.
                                    </p>
                                </ListGroupItem>

                                <ListGroupItem className="border-0 ps-0">
                                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                                        <i className="ri-checkbox-circle-line"></i> Quality support
                                    </p>
                                    <p className="choose__us-desc">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Qui, earum.
                                    </p>
                                </ListGroupItem>

                                <ListGroupItem className="border-0 ps-0">
                                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                                        <i className="ri-checkbox-circle-line"></i>Order from any
                                        location{" "}
                                    </p>
                                    <p className="choose__us-desc">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Qui, earum.
                                    </p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <section>
            <Container>
                <Row>
                    <Col lg="6" md="6">
                        <div className="testimonial ">
                            <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                            <h2 className="testimonial__title mb-4">
                                What our <span>customers</span> are saying
                            </h2>
                            <p className="testimonial__desc">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Distinctio quasi qui minus quos sit perspiciatis inventore
                                quis provident placeat fugiat!
                            </p>

                            <TestimonialSlider />
                        </div>
                    </Col>

                    <Col lg="6" md="6">
                        <img src={networkImg} alt="testimonial-img" className="w-100" />
                    </Col>
                </Row>
            </Container>
        </section>

    </Helmet>
}

export default Home