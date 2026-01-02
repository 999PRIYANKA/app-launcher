// Utility functions for generating audit logs and diffs

export const generateDiff = (oldObj, newObj) => {
    const changes = [];
    const keys = Object.keys(newObj);

    keys.forEach(key => {
        // Skip complex objects/arrays for simple diffing (units, tags, etc.)
        if (typeof newObj[key] === 'object' && newObj[key] !== null) return;
        if (key === 'id' || key === 'lastUpdated' || key === 'updatedAt') return;

        const oldVal = oldObj[key];
        const newVal = newObj[key];

        if (oldVal !== newVal) {
            // Format labels nicely (camelCase to Title Case)
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            
            if (!oldVal && newVal) {
                changes.push(`Set ${label} to "${newVal}"`);
            } else if (oldVal && !newVal) {
                changes.push(`Cleared ${label}`);
            } else {
                changes.push(`Changed ${label} from "${oldVal}" to "${newVal}"`);
            }
        }
    });

    return changes;
};

export const createActivityLogs = (recordId, diffs, userName = 'Current User') => {
    return diffs.map(diff => ({
        id: Math.random().toString(36).substr(2, 9),
        recordId,
        timestamp: new Date().toISOString(),
        userId: 'u1',
        userName,
        action: 'Update',
        details: diff
    }));
};
