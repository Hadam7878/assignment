import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { api } from '../../lib/axios';
import { useAppContext } from '../../provider/AppProvider';

const Right = () => {
    const { selectedProduct, setSelectedProduct, setProducts } = useAppContext();
    const [reviewerName, setReviewerName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('5');
    const [validationErrors, setValidationErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setReviewerName('');
        setComment('');
        setRating('5');
        setValidationErrors({});
        setSubmitError('');
        setSuccessMessage('');
    }, [selectedProduct?.id]);

    const getAverageRating = (reviews = []) => {
        if (reviews.length === 0) {
            return 'no ratings';
        }

        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = {};

        if (reviewerName.trim() === '') {
            errors.reviewerName = 'Reviewer name is required';
        }

        if (comment.trim() === '') {
            errors.comment = 'Comment is required';
        }

        setValidationErrors(errors);
        setSubmitError('');
        setSuccessMessage('');

        if (Object.keys(errors).length > 0 || !selectedProduct) {
            return;
        }

        const newReview = {
            reviewerName: reviewerName.trim(),
            comment: comment.trim(),
            rating: Number(rating),
            date: new Date().toISOString(),
        };

        const updatedReviews = [...(selectedProduct.reviews ?? []), newReview];

        try {
            setSubmitting(true);

            const response = await api.patch(`/products/${selectedProduct.id}`, {
                reviews: updatedReviews,
            });
            const updatedProduct = response.data;

            setProducts((currentProducts) =>
                currentProducts.map((product) =>
                    product.id === selectedProduct.id ? updatedProduct : product
                )
            );
            setSelectedProduct(updatedProduct);
            setReviewerName('');
            setComment('');
            setRating('5');
            setSuccessMessage('Review submitted successfully.');
        } catch (error) {
            console.error(error);
            setSubmitError('Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card style={{ width: '18rem', marginTop: '20px' }}>
            <Card.Body>
                <Card.Title>Review details</Card.Title>

                {!selectedProduct ? (
                    <Card.Text>Select a product to add a review.</Card.Text>
                ) : (
                    <>
                        <Card.Text>
                            <strong>{selectedProduct.title}</strong>
                            <br />
                            Price: ${selectedProduct.price.toFixed(2)}
                            <br />
                            Category: {selectedProduct.category}
                            <br />
                            Average Rating:{' '}
                            {getAverageRating(selectedProduct.reviews)}
                        </Card.Text>

                        {successMessage && (
                            <Alert variant="success">{successMessage}</Alert>
                        )}

                        {submitError && (
                            <Alert variant="danger">{submitError}</Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Reviewer name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={reviewerName}
                                    isInvalid={Boolean(validationErrors.reviewerName)}
                                    onChange={(event) =>
                                        setReviewerName(event.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.reviewerName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={comment}
                                    isInvalid={Boolean(validationErrors.comment)}
                                    onChange={(event) =>
                                        setComment(event.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.comment}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Rating</Form.Label>
                                <Form.Select
                                    value={rating}
                                    onChange={(event) =>
                                        setRating(event.target.value)
                                    }
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Select>
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? 'Sending...' : 'Send Review'}
                            </Button>
                        </Form>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default Right;
