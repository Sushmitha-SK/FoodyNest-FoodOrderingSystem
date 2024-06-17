import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../../styles/category.css";
import { getAllCategory } from "../../../api/categoryApi";
import { useNavigate } from "react-router-dom";


const Category = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [allFoodItems, setAllFoodItems] = useState([]);

    const navigate = useNavigate()

    const fetchAllCategories = async () => {
        const allCategoriesData = await getAllCategory();
        setCategories(allCategoriesData?.categories);
    };

    useEffect(() => {
        fetchAllCategories()
    }, [])

    const handleCategory = async (categoryName) => {
        setSelectedCategory(categoryName);
        navigate(`/foods?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <Container>
            <Row>
                <Col lg="12" className="text-center mb-4">
                    <h2>Categories</h2>
                </Col>

                {categories.map((item, index) => (
                    <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={index} >
                        <div className="category__item d-flex align-items-center gap-3" onClick={() => handleCategory(item.title)}>
                            <div className="category__img">
                                <img src={item.imageUrl} alt="category__item" style={{ width: '50px', height: '50px' }} />
                            </div>
                            <h6>{item.title}</h6>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Category;