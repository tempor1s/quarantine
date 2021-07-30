import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import quarantine from '../../apis/quarantine';
// @ts-ignore
import CELLS from 'vanta/dist/vanta.cells.min';
// @ts-ignore
import Tilt from 'react-tilt';

// =============================================
// EXCUSE ALL @ts-ignore. We're still not sure
// how to work with ts-react.
// =============================================

const Container = styled.div`
    height: 100vh;
`;

const VerifyContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const VerifyOutline = styled.div`
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 3px 0px #cfcfcf;
    background-color: white;
`;

const VerifyHeader = styled.h1`
    font-size: 27px;
    margin-bottom: 3px;
    color: #3f3f3f;
`;

const VerifySubHeader = styled.p`
    font-size: 19px;
    letter-spacing: 0.4px;
    color: #8f8f8f;
`;

const VerifyEmailMsg = styled.p`
    color: #ff5656;
    font-size: 16px;
    margin: 30px 0px -25px;
`;

const VerifyLink = styled.a`
    text-decoration: none;
`;

const VerifyBtn = styled.button`
    color: white;
    cursor: pointer;
    margin-top: 30px;
    font-size: 14px;
    text-transform: uppercase;
    padding: 5px 15px;
    border-radius: 8px;
    letter-spacing: 1px;
    font-weight: 500;
    // @ts-ignore
    background-color: #fea100;

    &:hover {
        padding: 5px 24px;
        opacity: 0.7;
    }
`;

const DisplayAuthBtn = (authLink: string) => {
    return (
        <>
            <VerifyEmailMsg>You must use your Dominican email!</VerifyEmailMsg>
            <VerifyLink href={authLink} target='_blank'>
                <VerifyBtn>Join now</VerifyBtn>
            </VerifyLink>
        </>
    );
};

const Home: React.FC = (props) => {
    const [authLink, setAuthLink] = useState('');

    if (authLink === '') {
        // @ts-ignore
        const userID = queryString.parse(props.location.search);

        quarantine
            .get(`/api/verify?uid=${userID.uid}`)
            .then((res) => {
                // @ts-ignore
                setAuthLink(res.data.url);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [vantaEffect, setVantaEffect] = useState(0);
    const myRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                CELLS({
                    el: myRef.current,
                    mouseControls: true,
                    touchControls: true,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.57,
                    size: 1.0
                })
            );
        }
        return () => {
            // @ts-ignore
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <Container ref={myRef}>
            <VerifyContainer>
                <Tilt className='Tilt' options={{ max: 16, scale: 1 }}>
                    <VerifyOutline>
                        <VerifyHeader>Survivors of Make School</VerifyHeader>
                        <VerifySubHeader>
                            Join fellow students and staff who
                            <span
                                style={{ textDecoration: 'line-through', opacity: '.5' }}
                            >
                                {' '}
                                survived{' '}
                            </span>
                            Make School.
                        </VerifySubHeader>
                        {authLink ? (
                            DisplayAuthBtn(authLink)
                        ) : (
                            <>
                                <VerifyLink href='https://discord.gg/tZyaVyB'>
                                    <VerifyBtn>Join</VerifyBtn>
                                </VerifyLink>
                            </>
                        )}
                    </VerifyOutline>
                </Tilt>
            </VerifyContainer>
        </Container>
    );
};

export default Home;
