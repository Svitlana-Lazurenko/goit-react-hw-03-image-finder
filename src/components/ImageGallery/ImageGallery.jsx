import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import imagesAPI from '../../services/image-api';
// import  from '../../styles/styles.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    imagesArr: [],
    error: null,
    status: Status.IDLE,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevImages = prevState.imagesArr;

    if (prevPage !== nextPage || (nextPage === 1 && prevName !== nextName)) {
      this.setState({ status: Status.PENDING });

      imagesAPI
        .fetchImages(nextName, nextPage)
        .then(imagesArr =>
          this.setState({
            imagesArr: [...prevImages, ...imagesArr.hits],
            status: Status.RESOLVED,
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  handlePageIncrement = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { imagesArr, error, status, page } = this.state;
    const { searchName } = this.props;

    if (status === 'idle') {
      return <div>Input search</div>;
    }

    if (status === 'pending') {
      return <Loader searchName={searchName} />;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {imagesArr.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem key={id} webformatImage={webformatURL} />
            ))}
          </ul>
          <Button
            page={page}
            searchName={searchName}
            onClick={this.handlePageIncrement}
          />
        </>
      );
    }
  }
}

export default ImageGallery;

// ImageGallery.propTypes = {
// };
