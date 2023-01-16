import ImageScorer from './ImageScorer';

export default function AdminApp() {

  return (
    <div>
      Admin app entry point
    </div>
  )
}



const images = [ // Test Data
    {
        id: 'image1',
        url: './ExampleImages/One.png',
        scores: {
            'Creativity': 2,
            'Colour': null,
            'Relevance': null
        }
    },
    {
        id: 'image2',
        url: './ExampleImages/Two.png',
        scores: {
            'Creativity': null,
            'Colour': 4,
            'Relevance': 3
        }
    },
    {
        id: 'image3',
        url: './ExampleImages/Three.png',
        scores: {
            'Creativity': 5,
            'Colour': 2,
            'Relevance': 1
        }
    }
]



const factors = [ // Temp
    'Creativity',
    'Colour',
    'Relevance'
];


interface DrawingInfo {
    name: string;
    location?: string;
    date: Date;
    imageURL: string;
}

export const ScoringFrame: React.FunctionComponent<DrawingInfo> = (props) => {
    return (
        <div className="drawingViewFrame">
            <ImageScorer images={images} factors={factors} />;
            <DrawingInfo {...props} />
        </div>
    )
}

export const DrawingInfo: React.FunctionComponent<DrawingInfo> = (props) => {
    return (
        <div>
            <table className="infoGrid" >
                <tr className="gridRow">
                    <td className="gridTitle">
                        Name:
                    </td>
                    <td className="gridTitle">
                        Location:
                    </td>
                    <td className="gridTitle">
                        Date:
                    </td>
                </tr>
                <tr>
                    <td className="gridValue">
                        {props.name}
                    </td>
                    <td className="gridValue">
                        {props.location}
                    </td>
                    <td className="gridValue">
                        {props.date.toLocaleString()}
                    </td>
                </tr>
            </table>
        </div>
    )
}








