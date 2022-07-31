import {screen} from "@testing-library/react";
import {renderWithProviders} from "../helpers/test-utils";
import {UpdateQaA} from "../../components/QaAForm/UpdateQaA";


describe('components/QaAForm/UpdateQaA', () => {
  it('should should get the id from the params and prefill the form', () => {
    // jest.spyOn(Router, 'useParams').mockReturnValue({ qaId: '1' } )
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: jest.fn().mockReturnValue({qaId: '1'}),
    }))

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        qaId: '1',
      }),
    }));

    renderWithProviders(<UpdateQaA/>)
    expect(screen.getByTestId('qa-form')).toBeInTheDocument()
  });
});

