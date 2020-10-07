import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import updateImages from '../redux/actions/updateImages';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'blue',
    border: '2px solid #000',
    padding: '0.5rem',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'aliceblue',
  },
  gridList: {
    width: 500,
    height: 450,
  },
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
  },
  img: {
    width: '100%',
  },
});

const ModalImages = ({ open, handleClose, images, changeImages }) => {
  const classes = useStyles();
  const availableImages = images.filter((img) => img.imageable_id == null);
  const [loading, setLoading] = useState(false);

  const getImages = async () => {
    setLoading(true);
    try {
      const config = {
        timeout: 10000,
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
      };
      const res = await axios.get('/api/images', config);
      setLoading(false);
      changeImages(res.data);
    } catch (err) {
      setLoading(false);
      handleClose(null);
    }
  };

  useEffect(() => {
    getImages();
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={() => handleClose(null)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <div className={classes.root}>
          {loading ? <CircularProgress /> : (
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {availableImages.map((tile) => (
                <GridListTile key={uuidv4()}>
                  <Button
                    className={classes.button}
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={() => handleClose(tile)}
                  >
                    <img className={classes.img} src={tile.location} alt={tile.key} />
                  </Button>
                </GridListTile>
              ))}
            </GridList>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

ModalImages.propTypes = {
  images: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  changeImages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
  images: state.images,
});

const mapDispatchToProps = (dispatch) => ({
  changeImages: (data) => dispatch(updateImages(data)),
});

const ModalImagesWrapper = connect(mapStateToProps, mapDispatchToProps)(ModalImages);

export default ModalImagesWrapper;
