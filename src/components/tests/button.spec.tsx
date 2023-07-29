import { render, screen } from '../../../__tests__/utils/customRender';
import { Button } from '../Button';

describe('Component: Button', () => {
  it('should be render button without icon', () => {
    render(<Button title='Test' />)

    const button = screen.getByText(/test/i);
    expect(button).toBeTruthy()
  })

  it('should be render button with icon', () => {
    const { debug } = render(
      <Button
        title='Test'
        typeColorButton='DEFAULT'
        icon='tag'
      />
    )
    debug();
  })
})
