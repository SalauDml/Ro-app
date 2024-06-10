import React from 'react';
import '../card.css';
import { naira_formater } from '../utils/functions';

export default function Card({ title, description, imageUrl, price }) {
    return (
        <div className="card">
            <div className="image-container">
                <img src={imageUrl}  alt={title} className="card-image" />
            </div>
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
                <p className="card-price">{naira_formater(price)}</p>
            </div>
        </div>
    );
}
