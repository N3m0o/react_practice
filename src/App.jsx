/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const myProducts = productsFromServer.map(product => {
  const category = categoriesFromServer.find(c => c.id === product.categoryId);
  const owner = usersFromServer.find(u => u.id === category.ownerId);

  return {
    ...product,
    category,
    owner,
  };
});

const tableHeaders = [
  { title: 'ID', field: 'id' },
  { title: 'Product', field: 'name' },
  { title: 'Category', field: 'category' },
  { title: 'User', field: 'owner' },
];

const users = usersFromServer;
const categories = categoriesFromServer;

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const visibleProducts = myProducts.filter(product => {
    if (selectedUser && product.owner.id !== selectedUser) {
      return false;
    }
    return true;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={!selectedUser ? 'is-active' : ''}
                onClick={() => setSelectedUser(null)}
              >
                All
              </a>

              {users.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={selectedUser === user.id ? 'is-active' : ''}
                  onClick={() => setSelectedUser(user.id)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {tableHeaders.map(({ title, field }) => (
                  <th key={field}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {title}

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {visibleProducts.map(product => (
                <tr data-cy="Product" key={product.id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>

                  <td data-cy="ProductCategory">
                    <span style={{ marginRight: 8 }}>
                      {product.category.icon}
                    </span>
                    {product.category.title}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={
                      product.owner.sex === 'm'
                        ? 'has-text-link'
                        : 'has-text-danger'
                    }
                  >
                    {product.owner.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
