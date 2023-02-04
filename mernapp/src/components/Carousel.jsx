import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() {
    return (
        <Carousel>
            <Carousel.Item style={
                {height: '400px'}
            }>
                <img style={
                        {
                            height: '400px',
                            width: '100%',
                            objectFit: 'cover'
                        }
                    }
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1612240498936-65f5101365d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFzdHJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                    alt="First slide"/>
            </Carousel.Item>
            <Carousel.Item style={
                {height: '400px'}
            }>
                <img style={
                        {
                            height: '400px',
                            width: '100%',
                            objectFit: 'cover'
                        }
                    }
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                    alt="Second slide"/>
            </Carousel.Item>
            <Carousel.Item style={
                {height: '400px'}
            }>
                <img style={
                        {
                            height: '400px',
                            width: '100%',
                            objectFit: 'cover'
                        }
                    }
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1625758600922-4085dd859395?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aWNlY3JlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                    alt="Third slide"/>
            </Carousel.Item>
        </Carousel>
    );
}

export default UncontrolledExample;
