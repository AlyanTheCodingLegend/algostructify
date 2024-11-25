import BinaryTree, { TreeNode as TreeNodeClass } from "../_datastructures/BinaryTree";

type TreeNodeProps = {
    node: TreeNodeClass<number> | null;
    index: number;
};

export const TreeNode:React.FC<TreeNodeProps> = ({ index, node }) => {
    if (!node) {
        return null;
    }

    return (
        <div className="flex flex-col items-center">
            {/* Current Node */}
            <div
                className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg ${
                    index === 0
                        ? "border-red-500 bg-red-100"
                        : "border-green-500 bg-green-100"
                }`}
            >
                <span>{node.data}</span>
            </div>

            {/* Left and Right Children */}
            <div className="flex gap-4 mt-4">
                {/* Left Child */}
                <TreeNode index={2 * index + 1} node={node.left} />
                {/* Right Child */}
                <TreeNode index={2 * index + 2} node={node.right} />
            </div>
        </div>
    );
};