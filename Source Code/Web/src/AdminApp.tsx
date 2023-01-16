import ImageScorer from './admin/ImageScorer';
import { Image } from './admin/ImageScorer';

export default function AdminApp() {

  return (
    <div>
          Admin app entry point
       {/*   <ScoringFrame images={sampleData} factors={factors} />*/} 
    </div>
  )
}



const sampleData = [ // Test Data
    {
        id: 'image1',
        location: 'Test',
        name: 'Teset 1',
        date: Date(),
        url: '.\src\Admin\ExampleImages\Three.png',
        scores: {
            'Creativity': null,
            'Colour': null,
            'Relevance': null
        }
    },
    {
        id: 'image2',
        location: 'Test',
        name: 'Teset 2',
        date: Date(),
        url: '.\src\Admin\ExampleImages\Three.png',
        scores: {
            'Creativity': null,
            'Colour': null,
            'Relevance': null
        }
    },
    {
        id: 'image3',
        location: 'Test',
        name: 'Teset 3',
        date: Date(),
        url: '.\src\Admin\ExampleImages\Three.png',
        scores: {
            'Creativity': null,
            'Colour': null,
            'Relevance': null
        }
    }
]



const factors = [ // Temp
    'Creativity',
    'Colour',
    'Relevance'
];


interface ScoringFrameProps {
    images: Image[];
    factors: string[];
}

export const ScoringFrame: React.FunctionComponent<ScoringFrameProps> = (props) => {
    return (
        <div className="drawingViewFrame">
            <ImageScorer images={props.images} factors={props.factors} />;
        </div>
    )
}

export const DrawingInfo: React.FunctionComponent<Image> = (props) => {
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
                        {props.date}
                    </td>
                </tr>
            </table>
        </div>
    )
}








