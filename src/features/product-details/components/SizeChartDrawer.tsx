import { Button } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { cn } from '@/shared/utils/cn';

// Example values for the demo. The API has no size chart data.
const exampleSizes: Record<string, { uk: string; us: string; footLength: string }> = {
  '38': { uk: '5', us: '6', footLength: '24.0 cm' },
  '40': { uk: '6.5', us: '7.5', footLength: '25.5 cm' },
  '42': { uk: '8', us: '9', footLength: '26.5 cm' },
};

type SizeChartDrawerProps = {
  open: boolean;
  onClose: () => void;
  sizes: string[];
  selected: string;
};

export function SizeChartDrawer({ open, onClose, sizes, selected }: SizeChartDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Size Chart"
      footer={
        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      }
    >
      <p className="text-body text-muted">
        Measure your foot from heel to toe and pick the closest size. If you are between two sizes, choose the bigger one.
      </p>

      <table className="mt-6 w-full text-left text-body">
        <thead>
          <tr className="border-b border-border text-subtle">
            <th className="px-1 py-3 font-medium">Size (EU)</th>
            <th className="py-3 font-medium">UK</th>
            <th className="py-3 font-medium">US</th>
            <th className="py-3 font-medium">Foot length</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => {
            const row = exampleSizes[size];

            return (
              <tr key={size} className={cn('border-b border-border', size === selected && 'bg-surface font-semibold')}>
                <td className="px-1 py-3">{size}</td>
                <td className="py-3">{row?.uk ?? '-'}</td>
                <td className="py-3">{row?.us ?? '-'}</td>
                <td className="py-3">{row?.footLength ?? '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Drawer>
  );
}
