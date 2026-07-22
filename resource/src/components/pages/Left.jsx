import { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useAppContext } from "../../provider/AppProvider";

const Left = () => {
    const { products, loading, error, setSelectedProduct } = useAppContext();

    // Lưu category mà người dùng đang chọn
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleAddReview = (reviews) => {
        if (!reviews || reviews.length === 0) {
            return "no ratings";
        }

        const total = reviews.reduce(
            (acc, review) => acc + review.rating,
            0
        );

        return (total / reviews.length).toFixed(1);
    };

    // Lấy category của tất cả sản phẩm và loại bỏ category trùng nhau
    const categories = [
        ...new Set(products.map((product) => product.category)),
    ];

    // Lọc sản phẩm theo category đang chọn
    const filteredProducts =
        selectedCategory === ""
            ? products
            : products.filter(
                  (product) => product.category === selectedCategory
              );

    return (
        <div>
            <Form.Select
                aria-label="Select product category"
                value={selectedCategory}
                onChange={(event) =>
                    setSelectedCategory(event.target.value)
                }
                style={{
                    width: "200px",
                    height: "38px",
                    marginTop: "20px",
                }}
            >
                <option value="">All categories</option>

                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </Form.Select>

            {loading && <p>Loading products...</p>}

            {error && <p>Error: {error}</p>}

            <Row>
                {filteredProducts.map((product) => (
                    <Col
                        key={product.id}
                        sm={4}
                        style={{ marginTop: "20px" }}
                    >
                        <Card
                            style={{
                                width: "17rem",
                                height: "18rem",
                                padding: "10px",
                            }}
                        >
                            <h5>{product.title}</h5>

                            <div
                                style={{
                                    padding: "10px",
                                    color: "gray",
                                }}
                            >
                                <p>${product.price.toFixed(2)}</p>
                                <p>{product.category}</p>
                            </div>

                            <p>
                                Average Rating:{" "}
                                {handleAddReview(product.reviews)}
                            </p>

                            <Button
                                variant="primary"
                                onClick={() => setSelectedProduct(product)}
                            >
                                Add New Review
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Left;
