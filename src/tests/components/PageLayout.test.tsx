import {render, screen} from "@testing-library/react";
import {PageLayout, PageLayoutProps} from "../../components/PageLayout/PageLayout";

const mockProps: PageLayoutProps = {
  header: <h1>Welcome to my app</h1>,
  sidebar: <p>Example content for the sidebar</p>,
  content: <h2>Example heading for the content area</h2>
}

describe('components/PageLayout', () => {
  it('should have all the required props rendered', () => {
    render(<PageLayout {...mockProps}/>)
    expect(screen.getByTestId('header-section')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-section')).toBeInTheDocument();
    expect(screen.getByTestId('content-section')).toBeInTheDocument();
  })
});
