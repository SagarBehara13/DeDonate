import React, { Component } from "react";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import image from '../images/organizationjpeg.jpg';
import MetaMaskLoginButton from 'react-metamask-login-button';
import '../stylesheet/style.css'
import Particles from 'react-particles-js';

class Home extends Component {
  render() {
    return (
      <div>
        <Particles
          params={{
            particles: {
              number: {
                value: 200,
                density: {
                  enable: true,
                  value_area: 1000
                }
              },
              color: {
                value: ["#356797", "#356797"]
              },
              shape: {
                type: "polygon",
                stroke: {
                  width: 0,
                  color: "#000000"
                },
                polygon: {
                  nb_sides: 4
                }
              },
              size: {
                value: 5,
                random: true,
                anim: {
                  enable: true,
                  speed: 4,
                  size_min: 1,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#58636d",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 5,
                direction: "left",
                random: true,
                straight: true,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: true,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: false,
                  mode: "grab"
                },
                onclick: {
                  enable: true,
                  mode: "repulse"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 200,
                  line_linked: {
                    opacity: 1
                  }
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3
                },
                repulse: {
                  distance: 200,
                  duration: 0.4
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
            retina_detect: true,
          }} />
        <div className="container">
          {/*<h1 className="head">DeDonate</h1>*/}

          <div className="main-home container">
            <div className="row sub-head">
              <div className="col main-content">
                <h4 className="content1"><span className="brand-highlight">DeDonate</span> is a decentralized platform for donation via the <strong>Ethereum</strong> blockchain. It allows people to donate to peers directly thus removing the frauds and faulty corrupted middleman and keeping the donation related activity anonymous!!</h4>
                <h3 className="content2">It allows charitable organizations to raise funds for their charitable activity through Ethereum blockchain.</h3>
              </div>
            </div>
            {/*<div className="row metamask-btn">*/}
            {/*  <MetaMaskLoginButton />*/}
            {/*</div>*/}
            <div className="btn-row">
              <div className="">
                <Link to={`/explore`}>
                  <Button color="danger" className="exp-btn1">Explore</Button>
                </Link>
              </div>
              <div className="btn2">
                <Link to={`/request`}>
                  <Button color="danger" className="exp-btn1">Request</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className='zig-zag-row'>
            <div className='zig-zag-row-image'>
              <img width="100%" src={image} className='internal-image'></img>
            </div>
            <div className='zig-zag-row-content'>
              <p className='internal-content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but also the
              leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
          </div>
          <div className='zig-zag-row'>
            <div className='zig-zag-row-content'>
              <p className='internal-content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but also the
              leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
            <div className='zig-zag-row-image'>
              <img width="100%" src={image} className='internal-image'></img>
            </div>
          </div>
          <div className='zig-zag-row'>
            <div className='zig-zag-row-image'>
              <img width="100%" src={image} className='internal-image'></img>
            </div>
            <div className='zig-zag-row-content'>
              <p className='internal-content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but also the
              leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
          </div>
          <div className='zig-zag-row'>
            <div className='zig-zag-row-content'>
              <p className='internal-content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but also the
              leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
            <div className='zig-zag-row-image'>
              <img width="100%" src={image} className='internal-image'></img>
            </div>
          </div>

        </div>
        {/*<div className="image">*/}
        {/*  <img width="100%" src={image}></img>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default Home;
