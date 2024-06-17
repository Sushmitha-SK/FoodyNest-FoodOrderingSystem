import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";
import { getAllFoodItems, getFoodByCategory } from "../api/foodApi";
import "../styles/all-foods.css";
import "../styles/pagination.css";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import NoFood from '../assets/images/nofood.gif';
import { Circles } from 'react-loader-spinner';

const AllFoods = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("default");
    const [pageNumber, setPageNumber] = useState(0);
    const [allFoodItems, setAllFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const categoryParam = queryParams.category || ''; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (categoryParam) {
                    await handleCategoryFood(categoryParam);
                } else {
                    await handleAllFoodItems();
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching food items:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryParam]); 

    const handleAllFoodItems = async () => {
        try {
            const getAllFoodItemData = await getAllFoodItems();
            setAllFoodItems(getAllFoodItemData?.foods || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching all food items:', error);
            setLoading(false);
        }
    };

    const handleCategoryFood = async (categoryParam) => {
        try {
            const categoryFoodItems = await getFoodByCategory(categoryParam);
            if (categoryFoodItems && categoryFoodItems.foods && categoryFoodItems.foods.length > 0) {
                setAllFoodItems(categoryFoodItems.foods);
            } else {
                console.log('No food items available for this category');
                setAllFoodItems([]);
            }
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    }

    const searchedProduct = allFoodItems.filter((item) => {
        if (searchTerm === "") {
            return item;
        }
        if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item;
        } else {
            return null;
        }
    });

    const sortedProducts = searchedProduct.sort((a, b) => {
        switch (sortOption) {
            case "ascending":
                return a.title.localeCompare(b.title);
            case "descending":
                return b.title.localeCompare(a.title);
            case "high-price":
                return b.price - a.price;
            case "low-price":
                return a.price - b.price;
            default:
                return 0;
        }
    });

    const productPerPage = 12;
    const visitedPage = pageNumber * productPerPage;
    const displayPage = sortedProducts.slice(
        visitedPage,
        visitedPage + productPerPage
    );

    const pageCount = Math.ceil(searchedProduct.length / productPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <Helmet title="All-Foods">
            <CommonSection title="All Foods" />
            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="6" xs="12">
                            <div className="search__widget d-flex align-items-center justify-content-between ">
                                <input
                                    type="text"
                                    placeholder="I'm looking for...."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <span>
                                    <i className="ri-search-line"></i>
                                </span>
                            </div>
                        </Col>
                        <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
                            <div className="sorting__widget text-end">
                                <select
                                    className="w-50"
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                >
                                    <option value="default">Default</option>
                                    <option value="ascending">Alphabetically, A-Z</option>
                                    <option value="descending">Alphabetically, Z-A</option>
                                    <option value="high-price">High Price</option>
                                    <option value="low-price">Low Price</option>
                                </select>
                            </div>
                        </Col>

                        {loading ? (
                            <div className="loader-container">
                                <Circles
                                    height="80"
                                    width="80"
                                    color="#007676"
                                    ariaLabel="circles-loading"
                                    visible={true}
                                />
                            </div>
                        ) : (
                            displayPage.length > 0 ? (
                                <>
                                    {displayPage.map((item) => (
                                        <Col lg="3" md="4" sm="6" xs="6" key={item._id} className="mb-4">
                                            <ProductCard item={item} />
                                        </Col>
                                    ))}
                                    <div>
                                        <ReactPaginate
                                            pageCount={pageCount}
                                            onPageChange={changePage}
                                            previousLabel={"Prev"}
                                            nextLabel={"Next"}
                                            containerClassName="paginationBttns"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    <img src={NoFood} style={{ width: '250px', height: '250px' }} alt="No food available" />
                                    <p>No items available.</p>
                                </div>
                            )
                        )}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default AllFoods;
