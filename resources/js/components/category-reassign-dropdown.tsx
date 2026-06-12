import SkillGroupSelect from '@/components/skill-group-select';
import { SkillGroups } from '@/types/models';

interface CategoryReassignDropdownProps {
    skillGroups: SkillGroups;
    disabled: boolean;
    onSelect: (skillGroupId: number) => void;
}

export default function CategoryReassignDropdown({ skillGroups, disabled, onSelect }: CategoryReassignDropdownProps) {
    const handleChange = (value: number | null) => {
        if (value !== null) {
            onSelect(value);
        }
    };

    return (
        <div className={disabled ? 'pointer-events-none opacity-50' : ''}>
            <SkillGroupSelect
                value={null}
                onChange={handleChange}
                options={skillGroups}
                placeholder="assign group"
            />
        </div>
    );
}
