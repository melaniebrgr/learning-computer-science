# Day 1: Secret Entrance
from pathlib import Path

file_path = Path(__file__).parent / 'input.txt'
with open(file_path, 'r') as file:
    lines = file.read().splitlines()

class NodeRing:
    # Define a doubly linked node list class
    def __init__(self, value):
        self.value = value
        self.next = None
        self.previous = None

# Create a doubly linked list ring example
node_1 = NodeRing(0)
node_2 = NodeRing(1)
node_3 = NodeRing(2)
node_4 = NodeRing(3)
node_5 = NodeRing(4)

node_1.next = node_2
node_1.previous = node_5
node_2.next = node_3
node_2.previous = node_1
node_3.next = node_4
node_3.previous = node_2
node_4.next = node_5
node_4.previous = node_3
node_5.next = node_1
node_5.previous = node_4

def instruction_splitter(instruction_raw: str) -> tuple[str, int]:
    # Split direction and distance
    # E.g. "L68" -> ("left", 68)
    # E.g. "R48" -> ("right", 48)
    direction = "left" if instruction_raw[0] == "L" else "right"
    distance = int(instruction_raw[1:])
    return direction, distance

def instruction_dialer(instruction_split: tuple[str, int], node: NodeRing) -> None:
    # Execute the instruction
    # E.g. ("left", 68) -> rotate left 68 clicks
    # E.g. ("right", 48) -> rotate right 48 clicks
    match instruction_split:
        case ("left", distance):
            for _ in range(distance):
                node = node.previous
        case ("right", distance):
            for _ in range(distance):
                node = node.next
    return node

def instructions_executor(instructions: [str], node: NodeRing) -> int:
    # given a list of strings
    # iterate through the list
    # for each item call the instruction splitter then the instruction dialer
    # if the dial value is 0, increment the count
    # return the count
    count = 0
    next_node = node
    for instruction_raw in instructions:
        instruction_split = instruction_splitter(instruction_raw)
        next_node = instruction_dialer(instruction_split, next_node)
        if next_node.value == 0:
            count += 1
    return count

print(instructions_executor(['R1', 'L1'], node_1)) # 2